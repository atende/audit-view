package br.pucminas.icei.audition.config;
import br.pucminas.icei.audition.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.core.Ordered;
import org.springframework.core.env.Environment;
import org.springframework.util.Assert;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.resource.AppCacheManifestTransformer;
import org.springframework.web.servlet.resource.ResourceUrlEncodingFilter;
import org.springframework.web.servlet.resource.VersionResourceResolver;

import java.util.Arrays;
import java.util.Locale;
import java.util.stream.Stream;

/**
 * @author Giovanni Silva
 *         10/09/15.
 */
@Configuration
public class WebConfig extends WebMvcConfigurerAdapter {
    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {
            "classpath:/META-INF/resources/", "classpath:/resources/",
            "classpath:/static/", "classpath:/public/"};
    @Autowired
    private Environment env;

    @Value("${resources.projectroot:}")
    private String projectRoot;

    @Value("${app.version:}")
    private String appVersion;

    private String getProjectRootRequired() {
        Assert.state((this.projectRoot != null && !this.projectRoot.trim().equals("")), "Please set \"resources.projectroot\" in application-dev.properties");
        return this.projectRoot;
    }
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
    }


    @Bean
    public ResourceUrlEncodingFilter resourceUrlEncodingFilter() {
        return new ResourceUrlEncodingFilter();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        String[] locations = null;
        if (devMode()) {
            String[] locationsDev = new String[1];
            locationsDev[0] = "file:///" + getProjectRootRequired() + "/client/";
            // Concatena dev com classpath
            locations = Stream.concat(Arrays.stream(locationsDev),
                    Arrays.stream(CLASSPATH_RESOURCE_LOCATIONS)).toArray(String[]::new);
        } else {
            locations = CLASSPATH_RESOURCE_LOCATIONS;
        }
        Integer cachePeriod = devMode() ? 0 : null;
        boolean useResourceCache = !devMode();
        String version = getApplicationVersion();

        AppCacheManifestTransformer appCacheTransformer = new AppCacheManifestTransformer();
        VersionResourceResolver versionResolver = new VersionResourceResolver()
                .addFixedVersionStrategy(version, "/**/*.js", "/**/*.map")
                .addContentVersionStrategy("/**");
        if (locations.length > 0)
            registry.addResourceHandler("/**")
                    .addResourceLocations(locations)
                    .setCachePeriod(cachePeriod)
                    .resourceChain(useResourceCache)
                    .addResolver(versionResolver)
                    .addTransformer(appCacheTransformer);
    }

    protected String getApplicationVersion() {
        return this.env.acceptsProfiles(Constants.SPRING_PROFILE_DEVELOPMENT) ? "dev" : this.appVersion;
    }
    // Internationalization and Locale

    @Bean(name ="messageSource")
    public ReloadableResourceBundleMessageSource messageSource(){
        ReloadableResourceBundleMessageSource messageSource;
        final String baseName = "classpath:/i18n/messages";
        final String encoding = "UTF-8";

        messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename(baseName);
        messageSource.setDefaultEncoding(encoding);

        return messageSource;
    }

    /**
     * Verifica se aplicacao esta no perfil development
     * @return
     */
    private boolean devMode(){
        return this.env.acceptsProfiles(Constants.SPRING_PROFILE_DEVELOPMENT);
    }
}
