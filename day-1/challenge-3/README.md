# CTF101 2017: Challenge 3

## Type of challenge

- Scripting

## Flag

```
flag{1m_7#3_brv73_w@2210r_0f_ju571c3}
```

---

## Find ideal name

```bash
while read p
do 
    curl 'http://128.199.224.160:3002/' \
        -H 'Origin: http://128.199.224.160:3002' \
        -H 'Accept-Language: en-US,en;q=0.8,sw;q=0.6' \
        -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36' \
        -H 'Content-Type: application/x-www-form-urlencoded' \
        -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8' \
        -H 'Cache-Control: no-cache' \
        -H 'Referer: http://128.199.224.160:3002/' \
        -H 'Cookie: PHPSESSID=fj3vk8ib77th8ru658pelr6091' \
        -H 'Connection: keep-alive' \
        --data 'username=$p'
done < names.txt
```

Simple to use Bash in time-sensitive situations.

## Find ideal stats

See `challenge-3/` for the Node.js script to brute force the flag.
