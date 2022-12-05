var expiry_time_in_second = 30;
var otp_length = 6;
var secret_key = 'THiIsATesting'; //encode this to base32 when adding to google authenticator https://emn178.github.io/online-tools/base32_encode.html
//https://github.com/hectorm/otpauth

function dec2hex(s){
    return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
}

function hex2dec(s) {
    return parseInt(s, 16);
}

function leftpad(str, len, pad){
    if (len + 1 >= str.length){
        str = Array(len + 1 - str.length).join(pad) + str;
    }
    return str;
}
    
function base32tohex(base32){
    var base32chars, bits, chunk, hex, i, val;
    base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    bits = "";
    hex = "";
    i = 0;

    while (i < base32.length){
        val = base32chars.indexOf(base32.charAt(i).toUpperCase());
        bits += leftpad(val.toString(2), 5, "0");
        i++;
    }

    i = 0;

    while (i + 4 <= bits.length){
        chunk = bits.substr(i, 4);
        hex = hex + parseInt(chunk, 2).toString(16);
        i += 4;
    }
    
    return hex;
}
    
function getOTP(secret, now = new Date().getTime()){
    var epoch, thmac, key, offset, OTP, shaObj, time_longhex;
    
    epoch = Math.round(now / 1000.0);
    time_longhex = leftpad(dec2hex(Math.floor(epoch / expiry_time_in_second)), 16, "0");
   
    //Converting the time_longhex to a byteArray
    var time = new Uint8Array(8);
    
    for (let i=0; i < time_longhex.length; i = i + 2){ 
        var combine_nibble_to_one_byte = time_longhex[i] += time_longhex[i+1];
        var padding_0x_infront = '0x';
        var singe_hex_byte = padding_0x_infront.concat(combine_nibble_to_one_byte);
        
        //showDialog(combi);
        time[i/2]=singe_hex_byte;
    }

    thmac = toHexString(hmac('SHA-1', secret, time));
    offset = hex2dec(thmac.substr(thmac.length - 1));
    OTP = (hex2dec(thmac.substr(offset * 2, 8)) & hex2dec("7fffffff")) + "";

    //showDialog(thmac);
    if (OTP.length > otp_length) {
        OTP = OTP.substr(OTP.length - otp_length, otp_length);
    } else {
        OTP = leftpad(OTP, otp_length, "0");
    }
      return OTP;
}

showDialog(getOTP(secret_key), "OTP");