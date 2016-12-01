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
    grok {
        patterns_dir => "/usr/share/logstash/patterns"
        match => { "message" => "%{NGINX_ERROR}" }
        remove_tag => ["_grokparsefailure"]
        add_tag => ["nginx_error"]
    }
    geoip {
      source => "visitor_ip"
    }
  }
}
output {
   elasticsearch { hosts => ["localhost:9200"] }
}

/usr/share/logstash/patterns/nginx
==================================

NGINX_ACCESS %{IPORHOST:visitor_ip} (?:-|(%{WORD}.%{WORD})) %{WORD:nginx_cache_status} \[%{HTTPDATE:timestamp}\] %{IPORHOST:nginx_host} "%{WORD:method} %{URIPATHPARAM:request} HTTP/%{NUMBER:httpversion}" %{NUMBER:response} %{NUMBER:bytes} %{QS:ignore} %{QS:referrer}
NGINX_ERROR %{DATE} %{TIME} %{GREEDYDATA:error} limiting requests, excess: %{GREEDYDATA:limit} client: %{IPORHOST:visitor_ip}, server: %{IPORHOST:nginx_host}, request: "%{WORD:method} %{URIPATHPARAM:request} HTTP/%{NUMBER:httpversion}", %{GREEDYDATA:msg}


Config log files permission
========================================

chmod 644 /var/log/nginx/*.log


Result http://192.168.1.244:9200/logstash-*/_search?pretty=true
=======================================

{
  "took" : 3,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "failed" : 0
  },
  "hits" : {
    "total" : 3,
    "max_score" : 1.0,
    "hits" : [
      {
        "_index" : "logstash-2016.11.30",
        "_type" : "nginx",
        "_id" : "AVi0jTGJjttDXyiqkWy3",
        "_score" : 1.0,
        "_source" : {
          "path" : "/var/log/nginx/access.log",
          "@timestamp" : "2016-11-30T09:25:00.726Z",
          "geoip" : { },
          "@version" : "1",
          "host" : "ubuntu",
          "message" : "192.168.1.100 - - [30/Nov/2016:16:25:00 +0700] \"GET / HTTP/1.1\" 304 0 \"-\" \"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36\"",
          "type" : "nginx",
          "tags" : [
            "_grokparsefailure",
            "_geoip_lookup_failure"
          ]
        }
      },
      {
        "_index" : "logstash-2016.11.30",
        "_type" : "nginx",
        "_id" : "AVi0js6tjttDXyiqkWy4",
        "_score" : 1.0,
        "_source" : {
          "path" : "/var/log/nginx/access.log",
          "@timestamp" : "2016-11-30T09:26:46.939Z",
          "geoip" : { },
          "@version" : "1",
          "host" : "ubuntu",
          "message" : "192.168.1.100 - - [30/Nov/2016:16:26:46 +0700] \"GET / HTTP/1.1\" 304 0 \"-\" \"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36\"",
          "type" : "nginx",
          "tags" : [
            "_grokparsefailure",
            "_geoip_lookup_failure"
          ]
        }
      },
      {
        "_index" : "logstash-2016.11.30",
        "_type" : "nginx",
        "_id" : "AVi0jt5VjttDXyiqkWy5",
        "_score" : 1.0,
        "_source" : {
          "path" : "/var/log/nginx/access.log",
          "@timestamp" : "2016-11-30T09:26:50.950Z",
          "geoip" : { },
          "@version" : "1",
          "host" : "ubuntu",
          "message" : "192.168.1.100 - - [30/Nov/2016:16:26:50 +0700] \"GET / HTTP/1.1\" 304 0 \"-\" \"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36\"",
          "type" : "nginx",
          "tags" : [
            "_grokparsefailure",
            "_geoip_lookup_failure"
          ]
        }
      }
    ]
  }
}