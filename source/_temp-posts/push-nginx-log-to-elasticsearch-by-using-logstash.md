nginx access log
=================
192.168.1.100 - - [01/Dec/2016:10:38:17 +0700] "GET / HTTP/1.1" 304 0 "-" "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36"


/usr/share/logstash/patterns/nginx
==================================

NGINX_ACCESS %{IPORHOST:remote_ip} - %{DATA:user_name} \[%{HTTPDATE:time}\] "%{WORD:request_action} %{DATA:request} HTTP/%{NUMBER:http_version}" %{NUMBER:response} %{NUMBER:bytes} "%{DATA:referrer}" "%{DATA:agent}"


/etc/logstash/conf.d/nginx.conf
==========================================

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


Config log files permission
========================================

chmod 644 /var/log/nginx/*.log


Result http://192.168.1.244:9200/nginx_log_test/_search?&scroll=1m&size=1000&pretty=true
=======================================
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