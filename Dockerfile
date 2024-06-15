FROM ubuntu:latest

RUN apt update 
RUN apt install -y nodejs

ENTRYPOINT ["/bin/bash"]