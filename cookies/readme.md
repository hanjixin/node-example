## cookies的重要属性
|    属性   |说明                    |      
|----------------|-------------------------------|
|name=value	|     `键值对，可以设置要保存的 Key/Value  `            | 
|Domain          |`域名，默认是当前域名`   | 
|maxAge          |`最大失效时间(毫秒)，设置在多少秒后失效`|   
|secure          |`当 secure 值为 true 时，cookie 在 HTTP 中是无效，在 HTTPS 中才有效`|  
|Path          |`取消编辑状态`|  
|Expires          |`过期时间(秒)，在设置的某个时间点后该 Cookie 就会失效，如 expires=Money, 05-Dec-11 11:11:11 GMT`|  
|httpOnly          |`如果在COOKIE中设置了httpOnly属性，则通过程序(JS脚本)将无法读取到COOKIE信息，防止XSS攻击产生`|  
