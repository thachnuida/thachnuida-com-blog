title: Lưu log của nginx vào elastic search bằng logstash
date: 2016-12-04 15:00:00
tags:
  - Logstash
  - Nginx
  - Elastic search
---

Thông thường, mỗi truy cập vào nginx đều được lưu vào file log, ví dụ `/var/log/nginx/access.log`. Tại đây, ta có thể coi các thông tin về truy cập như thời gian, đường dẫn, trình duyệt của người dùng.

Nhưng nếu ta cần có thống kê chi tiết hơn về các truy cập này, như số lượt truy cập trong ngày, phân loại người dùng ... thì file log này là chưa đủ. Cho nên, ta có thể đẩy những log này lên elastic search rồi từ đó dùng các công cụ thích hợp để phân tích.

<!-- more -->

Dưới đây là các bước mình đẩy log của nginx lên elastic search sử dụng logstash.

# Cài đặt elastic search và logstash

Môi trường mình sử dụng ở đây là ubuntu, coi như nginx đã được cài đặt rồi.

- Cài đặt elastic search theo hướng dẫn sau: https://www.elastic.co/guide/en/elasticsearch/reference/5.0/deb.html
- Cài đặt logstash theo hướng dẫn sau: https://www.elastic.co/guide/en/logstash/current/installing-logstash.html#package-repositories

*Chú ý: Phiên bản elastic search hiện tại yêu cầu java 1.8*

# Start elastic search và logstash

Từ terminal để khởi động hai dịch vụ trên ta chạy:

```
sudo service elasticsearch start
sudo service logstash start
```

# Bản log của nginx

Dưói đây là một mẫu log của nginx

```
192.168.1.100 - - [01/Dec/2016:10:38:17 +0700] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36"
```

# Tạo 1 pattern cho logstash để phân tích mẫu log của nginx

Trong thư mục `/usr/share/logstash/` tạo thư mục `patterns`, sau đó tạo file `nginx` (Chú ý là file, chứ không phải thư mục) trong thư mục `patterns`

```
sudo nano /usr/share/logstash/patterns/nginx
```

Nội dung file `nginx` như sau:

```
NGINX_ACCESS %{IPORHOST:remote_ip} - %{DATA:user_name} \[%{HTTPDATE:time}\] "%{WORD:request_action} %{DATA:request} HTTP/%{NUMBER:http_version}" %{NUMBER:response} %{NUMBER:bytes} "%{DATA:referrer}" "%{DATA:agent}"
```

# Cấu hình logstash để đẩy log từ nginx lên elastic search

Tạo file `nginx.conf` trong thư mục `/etc/logstash/conf.d/`

```
sudo nano /etc/logstash/conf.d/nginx.conf
```

Nội dung file `nginx.conf` như sau:

```
input {
  file {
    type => "nginx"
    start_position => "beginning"
    path => [ "/var/log/nginx/*.log" ]
  }
}
filter {
  if [type] == "nginx" {
    grok {
        patterns_dir => "/usr/share/logstash/patterns"
        match => { "message" => "%{NGINX_ACCESS}" }
        remove_tag => ["_grokparsefailure"]
        add_tag => ["nginx_access"]
    }
    date {
      match => [ "time", "dd/MMM/YYYY:HH:mm:ss Z" ]
      locale => en
    }

    geoip {
      source => "remote_ip"
      target => "geoip"
    }

    useragent {
      source => "agent"
      target => "user_agent"
    }
  }
}
output {
  elasticsearch {
    index => "nginx_log_test"
    hosts => ["localhost:9200"] 
  }
}
```

# Config lại quyền của file log để logstash có thể đọc được

```
chmod 644 /var/log/nginx/*.log
```

# Kết quả

Bây giờ bạn thử truy cập vào trang web được phục vụ bởi server nginx của bạn, cứ mỗi lần bạn truy cập vào thì log của nginx sẽ được logstash đẩy lên elastic search.

Đây là kết quả khi mình search từ elastic search tại đường dẫn `http://192.168.1.244:9200/nginx_log_test/_search?&scroll=1m&size=1000&pretty=true`

```
{
  "_scroll_id" : "DnF1ZXJ5VGhlbkZldGNoBQAAAAAAAAAdFkhleEZWRFdPUmJXcnBqc3h0eUtGbWcAAAAAAAAAHBZIZXhGVkRXT1JiV3JwanN4dHlLRm1nAAAAAAAAABoWSGV4RlZEV09SYldycGpzeHR5S0ZtZwAAAAAAAAAeFkhleEZWRFdPUmJXcnBqc3h0eUtGbWcAAAAAAAAAGxZIZXhGVkRXT1JiV3JwanN4dHlLRm1n",
  "took" : 3,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 1,
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "nginx_log_test",
        "_type" : "nginx",
        "_id" : "AVi4dhUNQ4OVFTpBmGks",
        "_score" : 1.0,
        "_source" : {
          "request" : "/",
          "request_action" : "GET",
          "agent" : "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36",
          "geoip" : { },
          "user_name" : "-",
          "http_version" : "1.1",
          "message" : "192.168.1.100 - - [01/Dec/2016:10:38:14 +0700] \"GET / HTTP/1.1\" 304 0 \"-\" \"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36\"",
          "type" : "nginx",
          "tags" : [
            "nginx_access",
            "_geoip_lookup_failure"
          ],
          "path" : "/var/log/nginx/access.log",
          "referrer" : "-",
          "@timestamp" : "2016-12-01T03:38:14.000Z",
          "remote_ip" : "192.168.1.100",
          "response" : "304",
          "bytes" : "0",
          "@version" : "1",
          "host" : "ubuntu",
          "time" : "01/Dec/2016:10:38:14 +0700",
          "user_agent" : {
            "patch" : "2840",
            "os" : "Windows 10",
            "major" : "54",
            "minor" : "0",
            "name" : "Chrome",
            "os_name" : "Windows 10",
            "device" : "Other"
          }
        }
      }
    ]
  }
}
```

Bạn thấy đấy, log của nginx đã được phân tách và lưu đầy đủ trên elastic search. Thật tuyệt vời phải không?