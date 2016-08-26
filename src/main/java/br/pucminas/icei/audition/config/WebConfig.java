package br.pucminas.icei.audition.config;

import br.pucminas.icei.audition.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.AppCacheManifestTransformer;
import org.springframework.web.servlet.resource.ResourceUrlEncodingFilter;
import org.springframework.web.servlet.resource.VersionResourceResolver;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Config the Spring web server
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

    @Value("${app.version:}")
    private String appVersion;

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
    }

    @Bean
    public ResourceUrlEncodingFilter resourceUrlEncodingFilter() {
        return new ResourceUrlEncodingFilter();
    }

    // Internationalization and Locale

    @Bean(name = "messageSource")
    public ReloadableResourceBundleMessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource;
        final String baseName = "classpath:/i18n/messages";
        final String encoding = "UTF-8";

        messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename(baseName);
        messageSource.setDefaultEncoding(encoding);

        return messageSource;
    }

    @Bean
    public ServerProperties getServerProperties() {
        return new ServerCustomization();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        String[] locations = null;
        if (devMode()) {
            locations = getDevLocations();
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
        return this.env.acceptsProfiles("development") ? "dev" : this.appVersion;
    }

    private boolean devMode(){
        return this.env.acceptsProfiles(Constants.SPRING_PROFILE_DEVELOPMENT);
    }
    private String getCurrentFileLocation() {
        File file = new File(".");
        return file.getAbsolutePath();
    }

    private String getClientFolderLocation() {
        String currentFile = getCurrentFileLocation();
        if (currentFile.endsWith(".")) {
            currentFile = currentFile.substring(0, currentFile.length() - 1);
        }
        File file = new File(currentFile + "/client");

        return "file:///" + file.getAbsolutePath() + "/";
    }

    private String[] getDevLocations() {
        List<String> resources = new ArrayList<>();
        for (String r : CLASSPATH_RESOURCE_LOCATIONS) {
            resources.add(r);
        }
        resources.add(getClientFolderLocation());
        resources.add(getClientFolderLocation() + "dist/dev/");
        return resources.toArray(new String[resources.size()]);
    }


}
