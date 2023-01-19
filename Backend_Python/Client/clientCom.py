import requests
import schedule
import os
import json
import math
global id

# 암호화/복호화 모듈 사용
import base64

from Cryptodome import Random
from Cryptodome.Cipher import AES

from Cryptodome import Random
from Cryptodome.Cipher import AES

BS = 16
pad = lambda s: s + (BS - len(s.encode('utf-8')) % BS) * chr(BS - len(s.encode('utf-8')) % BS)
unpad = lambda s : s[:-ord(s[len(s)-1:])]

key = [0x10, 0x01, 0x15, 0x1B, 0xA1, 0x11, 0x57, 0x72, 0x6C, 0x21, 0x56, 0x57, 0x62, 0x16, 0x05, 0x3D, 0xFF, 0xFE, 0x11, 0x1B, 0x21, 0x31, 0x57, 0x72, 0x6B, 0x21, 0xA6, 0xA7, 0x6E, 0xE6, 0xE5, 0x3F]

class AESCipher:
    def __init__( self, key ):
        self.key = key

    def encrypt( self, raw ):
        raw = pad(raw)
        iv = Random.new().read( AES.block_size )
        cipher = AES.new( self.key, AES.MODE_CBC, iv )
        return base64.b64encode( iv + cipher.encrypt( raw.encode('utf-8') ) )

    def decrypt( self, enc ):
        enc = base64.b64decode(enc)
        iv = enc[:16]
        cipher = AES.new(self.key, AES.MODE_CBC, iv )
        return unpad(cipher.decrypt( enc[16:] ))

url = "http://servmon.cafe24.com:5000"

# cpu load : cpu에 실행중이거나 대기중인 작업의 개수를 평균으로 보여주는 값
# workload : 주어진 기간에 시스템에 의해 실행되어야 할 작업의 할당량
# 명령어 - uptime, top

def sending():
    os.system('powertop --html=process.html -time=1')

    f=open("process.html","rt")
    
    temp = 0
    state_cpu = 'no'
    state_power = 'no'

    cpu_usage = ''
    power_usage = 0

    while True:
        line = f.readline()
        if not line :
            break

        if line.find('<br/><div id="main_menu"> </div>') != -1:
            state_cpu = 'ok'
        elif line.find('<h2 class="content_title"> Overview of Software Power Consumers </h2>') != -1:
            state_power = 'ok';

        if state_cpu == 'ok':
            if line.find('<li class="summary_list">') != -1:
                cpu_temp = line.split('<li class="summary_list"> <b> CPU:  </b>')
                cpu_usage = cpu_temp[1].split('</li><li class="summary_list">')[0]
                cpu_usage = float(cpu_usage.split('%')[0])
                state_cpu = 'no'
            elif line.find('<div class="clear_block" id="summary">') != -1:
                state_cpu = 'no'

        if state_power == "ok" :
            if line.find('<tr class="emph1">') != -1 & line.find('<th class="emph_title"> Usage </th> <th class="emph_title"> Wakeups/s </th> ') == -1 :
                temp =  line.split('<td class="no_wrap">')[-1]
                if temp.find('uW') != -1:
                    power_uw = temp.split('uW')[0]
                    # print(float(power_uw),'uW')
                    power_usage += float(power_uw)*0.000001
                elif temp.find('mW') != -1:
                    power_mw = temp.split('mW')[0]
                    # print(float(power_mw),'mW')
                    power_usage += float(power_mw)*0.001
                elif temp.find('W') != -1:
                    power_w = temp.split('W')[0]
                    # print(float(power_w),'W')
                    power_usage += float(power_w)
            if line.find('</table>') != -1 :
                break
    # print('cpu_usage = ', cpu_usage,"%")
    # print('power_usage = ', power_usage,"W")
    f.close()
    power_usage = round(power_usage,3)
    if(power_usage == 0):
        print('power usage error')
    elif(cpu_usage == 0 or cpu_usage == ''):
        print('cpu usage error')

    uptime = os.popen('uptime').read()
    line = uptime.split(', ')
    # print(line[1][1]) # user number

    cpu_str = str(cpu_usage) + ' %'
    power_str = str(round(power_usage, 6)) + ' W'

    date = os.popen('date "+%Y-%m-%d %H:%M:%S"').read().split('\n')[0]

    on_datas = {
		'id' : id,
		'time' : date,
		'state' : 'on',
                'cpu_usage' : cpu_str,
		'user_num' : line[1][1],
                'power_usage' : power_str
	}

## connection Error
    try:
        response = requests.get(url, params=on_datas)
        # print(response)
        if response.status_code == 200:
            print(response.url)

    except requests.exceptions.ConnectionError as errc:
        print ("Error Connecting:",errc)

schedule.every(8).seconds.do(sending)

try:
    id = ''
    check = 0; # 0 : id no exist, 1 : id exist

    try: # 파일에 id가 저장되어 있으면
        f = open('save_id.txt', 'rb') # 파일에 있는 id 불러오기
        file_id = f.read()

        id_dec = AESCipher(bytes(key)).decrypt(file_id) # 불러온 id 복호화
        dec_str = id_dec.decode('utf-8') # 바이트 형태를 string으로

        print('id를 자동으로 불러옵니다.')
        print('id : ' + dec_str)
        id = dec_str

        f.close()

    except:
        id = input("Client id 입력 : ")

# request 를 보내서 response 받고
    response = requests.get('http://servmon.cafe24.com:5000/id', params={'id':id})
    check = response.text


# 그에 따라서 실행 여부 확인
    if(check == 'Success'):
        print("'" + id + "'", "id로 접속 완료!")

        id_enc = AESCipher(bytes(key)).encrypt(id) # 암호화

        f = open('save_id.txt', 'wb') # 암호화 한 것 파일에 쓰기
        f.write(id_enc)

        f.close()
        while True:
            schedule.run_pending()
    elif(check == 'Fail'):
        print("입력한 id는 등록이 되어 있지 않은 id입니다.\nWeb Server에서 등록 후 이용해주세요!")

except KeyboardInterrupt:
    end_time = os.popen('date "+%Y-%m-%d %H:%M:%S"').read().split('\n')[0]
    off_datas = {
        'id' : id,
        'time' : end_time,
        'state' : 'off',
    }
    try:
        response = requests.get(url, params=off_datas)
        if response.status_code == 200:
            print(response.url)
    except requests.exceptions.ConnectionError as errc:
        print ("Error Connecting:",errc)

# 새로 등록하면 접속 완료 됐을 때 새로운 텍스트 파일 만들어 줌
# 만들어진 텍스트 파일에는 id가 암호화되어 저장

# 텍스트 파일 있으면 등록된 id가 있다고 알려주기
# id를 복호화하여 불러와줌
# 불러온 id를 가지고 데이터 전송

