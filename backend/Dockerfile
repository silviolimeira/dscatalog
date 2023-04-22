FROM openjdk:11
# \\wsl.localhost\docker-desktop-data\mnt\wslg\distro\data\docker\volumes\
VOLUME /tmp
EXPOSE 8080
ADD ./target/dscatalog-0.0.1-SNAPSHOT.jar dscatalog.jar
ENTRYPOINT ["java", "-jar", "dscatalog.jar"]
