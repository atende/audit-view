package br.pucminas.icei.audition.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
//import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.sql.SQLException;

/**
 * @author Bruno Henrique Moraes D'Amato
 */
@Configuration
@ConfigurationProperties(prefix = "params.datasource")
public class JPAConfig extends HikariConfig {

    //dependência de compile('com.zaxxer:HikariCP:2.4.4') ou outro a ser importado?
    //A configuração deve ser realizada em apllication-dev.properties ou deve se criar um somente para ele?
    @Bean
    public HikariDataSource dataSource() throws SQLException {
        return new HikariDataSource(this);
    }
}

