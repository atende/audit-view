# App configuration

The application can be configure using spring boot configuration properties

[http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html]

That mean you can use startup params like in: `java -jar application.jar --spring.datasource.username=bla` or environment
variables like `export SPRING_DATASOURCE_USERNAME=bla`

## Database

    spring.datasource.username=bla
    spring.datasource.password=xyz
    spring.datasource.jdbc-url=jdbc:postgres://localhost/audit
    spring.datasource.driver-class-name=org.postgresql.Driver # defautls to org.postgresql.Driver
    spring.datasource.maximumPoolSize=5 # defaults to 5
    spring.datasource.connection-timeout=5000 # defaults to 5000

As Environment Variables

    export SPRING_DATASOURCE_USERNAME=bla
    export SPRING_DATASOURCE_PASSWORD=xyz
    export SPRING_DATASOURCE_JDBC_URL=jdbc:postgres://localhost/audit
    export SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver # defautls to org.postgresql.Driver
    export SPRING_DATASOURCE_MAXIMUM_POOL_SIZE=5 # defaults to 5
    export SPRING_DATASOURCE_CONNECTION_TIMEOUT=5000 # defaults to 5000

## Authetication

    keycloak.configurationFile=file:///location/of/keycloak.json

As environment variable

    export KEYCLOAK_CONFIGURATIONFILE=file:///localhost/of/keycloak.json


[http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html]:http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html