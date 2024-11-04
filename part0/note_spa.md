```mermaid
sequenceDiagram
participant browser
participant server

browser->>server: POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
activate server
server-->>browser: 201 created
deactivate server
```
