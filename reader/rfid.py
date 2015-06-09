import ctypes
from ctypes.wintypes import *
import sys
import time

RESULT_OK = 0
rfid_port = 3 #COM3

lib = ctypes.WinDLL('EMR300DLL.dll')
rfid_open_port = lib['EMR300_ComOpen']
rfid_rfcontrol = lib['EMR300_RFControl']
rfid_inventory = lib['EMR300_Inventory']

rfid_open_port(rfid_port)
rfid_rfcontrol(1)

mask = LPBYTE(BYTE(16))
lplen = PSHORT(SHORT(0))
lpresp = LPBYTE(BYTE(256))
#print(rfid_inventory(38, 0, 0, ctypes.byref(mask), ctypes.byref(lplen), ctypes.byref(lpresp)))

data = ""
not_retrieved = True
total_byte = 0
while not_retrieved:
  #print('reading..', end='\r')
  rfid_inventory(0x26, 0, 0, mask, lplen, lpresp)
  lpstr = ""
  for x in range(9, 1, -1):
    data = lpresp[x] if lpresp[x] > 0 or lpresp[x] == 256 else (256 + lpresp[x])
    #print("data: %s, lpresp: %s"  % (data, lpresp[x]))
    total_byte += lpresp[x]
    if total_byte > 0: not_retrieved = False
    lpstr += '{:x}'.format(int(data)).upper()
  if not_retrieved == True:
    time.sleep(0.5)

print(lpstr)