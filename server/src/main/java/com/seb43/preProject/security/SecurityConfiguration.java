package com.seb43.preProject.security;

import com.seb43.preProject.security.filter.JwtAuthenticationFilter;
import com.seb43.preProject.security.filter.JwtVerificationFilter;
import com.seb43.preProject.security.jwt.JwtTokenizer;
import com.seb43.preProject.security.util.CustomAuthorityUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {
    public class SecurityConfig {
        private final JwtTokenizer jwtTokenizer;
        private final CustomAuthorityUtil authorityUtil;

        public SecurityConfig(JwtTokenizer jwtTokenizer, CustomAuthorityUtil authorityUtil) {
            this.jwtTokenizer = jwtTokenizer;
            this.authorityUtil = authorityUtil;
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http
                    .headers().frameOptions().sameOrigin()
                    .and()
                    .csrf().disable()
                    .cors(withDefaults())
                    .formLogin().disable()
                    .httpBasic().disable()
                    .apply(new CustomFilterConfigurer())
                    .and()
                    .authorizeHttpRequests(authorize -> authorize
                            .anyRequest().permitAll()
                    );
            return http.build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return PasswordEncoderFactories.createDelegatingPasswordEncoder();
        }

        @Bean
        CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedOrigins(Arrays.asList("*"));
            configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));

            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", configuration);
            return source;
        }

        public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
            @Override
            public void configure(HttpSecurity builder) throws Exception {
                AuthenticationManager authenticationManager =
                        builder.getSharedObject(AuthenticationManager.class);

                JwtAuthenticationFilter jwtAuthenticationFilter =
                        new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);

                jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");

                JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtil);
                builder
                        .addFilter(jwtAuthenticationFilter)
                        .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
            }
        }
    }
}
