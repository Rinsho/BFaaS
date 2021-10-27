# BFaaS
BF interpreter server using Express. Because you hate yourself.

Torment to enjoy:
- [x] A one-shot POST endpoint.
```
Request:
POST localhost:3000/interpreter
Content-Type: application/json
{
    "code": "+++++++++[>++++++++<-]>.$+.$",
    "input": "" //optional
}
Response:
{
    "output": "HI"
}
```

Torment to be done:
- [] Sessions for a BF interactive option.
- [] Clean up some of the existing code.
- [] Documentation.