Ulbora Challenge 
==============

A Challenge and Response Micro Service

## Get Challenge

```
    Example Request
    GET:
    URL: http://localhost:3003/rs/challenge/en_us
  
```

```
   Example Response   

    {
        "question": "What is less, 2+2 or 4+3?",
        "key": "hmc12cw0kejdlbwgqjcvhu3z/rx/utkqt3kebixqpnqt84bful32bne9bz3rmtfiztsvceyt+cvmpgwsxcezra=="
    }
  
```

## Validate Challenge


```   
    POST:
    URL: http://localhost:3003/rs/challenge
    Example Request
    {
        "answer":"2+2",
        "key":"pajue/pq8zghqwe/whpqfmmzcryj10mtiax0+adn2xrpmgd/04gbvv+aezp98rocaecy4d2l0hxliaxcy0rmxg=="
    }
   
  
```

```
   Example Response   

    {
        "success": true
    }
  
```

