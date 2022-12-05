import hmac, base64, struct, hashlib, time, binascii
def get_hotp_token(secret, intervals_no):
    key = base64.b32decode(secret, True)
    print(binascii.hexlify(key))
    #decoding our key
    msg = struct.pack(">Q", intervals_no)
    print(binascii.hexlify(msg))
    #conversions between Python values and C structs represente
    print("key to add in HTTP Request is:" , key)
    h = hmac.new(key, msg, hashlib.sha1).digest()
    o = o = h[19] & 15
    print (binascii.hexlify(h))
    #Generate a hash using both of these. Hashing algorithm is HMAC
    h = (struct.unpack(">I", h[o:o+4])[0] & 0x7fffffff) % 1000000
    #unpacking
    return h
def get_totp_token(secret):
    #ensuring to give the same otp for 30 seconds
    x =str(get_hotp_token(secret,intervals_no=int(time.time())//30))
    #adding 0 in the beginning till OTP has 6 digits
    while len(x)!=6:
        x+='0'
    return x
#base64 encoded key
#secret = 'THiIsATesting'                   #This key is need to add in HTTP Reuqest APP
secret = 'KREGSSLTIFKGK43UNFXGO===' #This key is needed to add in google authenticator, generate from https://emn178.github.io/online-tools/base32_encode.html

print(get_totp_token(secret))