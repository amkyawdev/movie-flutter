FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y curl git unzip xz-utils zip libglu1-mesa && \
    curl -fsSL https://storage.googleapis.com/flutter-internet/archives/flutter.tar.xz | tar -xJ -C /opt && \
    ln -s /opt/flutter/bin/flutter /usr/local/bin/flutter

WORKDIR /workspace

COPY pubspec.yaml ./
RUN flutter pub get

COPY . .

ENV FLUTTER_ROOT=/workspace

CMD ["flutter", "run", "-d", "chrome"]