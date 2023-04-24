package com.seb43.preProject.security;

import com.seb43.preProject.security.filter.JwtAuthenticationFilter;
import com.seb43.preProject.security.filter.JwtVerificationFilter;
import com.seb43.preProject.security.handler.MemberAccessDeniedHandler;
import com.seb43.preProject.security.handler.MemberAuthenticationEntryPoint;
import com.seb43.preProject.security.handler.MemberAuthenticationFailureHandler;
import com.seb43.preProject.security.handler.MemberAuthenticationSuccessHandler;
import com.seb43.preProject.security.jwt.JwtTokenizer;
import com.seb43.preProject.security.util.CustomAuthorityUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
                    .cors().configurationSource(corsConfigurationSource())
                    .and()
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    .and()
                    .formLogin().disable()
                    .httpBasic().disable()
                    .exceptionHandling()
                    .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                    .accessDeniedHandler(new MemberAccessDeniedHandler())
                    .and()
                    .apply(new CustomFilterConfigurer())
                    .and()
                    .authorizeHttpRequests(authorize -> authorize
                            .antMatchers(HttpMethod.POST, "/members/join").permitAll()
                            .antMatchers(HttpMethod.GET, "/members/**/profile").hasRole("USER")
                            .antMatchers(HttpMethod.PATCH, "/members/**/profile").hasRole("USER")
                            .antMatchers(HttpMethod.DELETE, "/members/**/profile/delete").hasRole("USER")

                            .antMatchers(HttpMethod.POST, "/question").hasRole("USER")
                            .antMatchers(HttpMethod.PATCH, "/question/**/edit").hasRole("USER")
                            .antMatchers(HttpMethod.GET, "/question/**").permitAll()
                            .antMatchers(HttpMethod.GET, "/question").permitAll()
                            .antMatchers(HttpMethod.DELETE, "/question/**/**").hasRole("USER")
                            .antMatchers(HttpMethod.GET, "/question/search").permitAll()
                            .antMatchers(HttpMethod.GET, "/question/**/**/vote/up").hasRole("USER")
                            .antMatchers(HttpMethod.GET, "/question/**/**/vote/down").hasRole("USER")
//                            .antMatchers(HttpMethod.GET, "/question/currentUri/**").permitAll()

                            .antMatchers(HttpMethod.POST, "/question/**").hasRole("USER")
                            .antMatchers(HttpMethod.PATCH, "/question/**/**/edit").hasRole("USER")
                            .antMatchers(HttpMethod.GET, "/question/**/answers").permitAll()
                            .antMatchers(HttpMethod.DELETE, "/question/**/answers/**/**").hasRole("USER")

                            .antMatchers(HttpMethod.POST, "/comment/question/**").hasRole("USER")
                            .antMatchers(HttpMethod.POST, "/comment/answer/**").hasRole("USER")
                            .antMatchers(HttpMethod.PATCH, "/comment/question/**/**").hasRole("USER")
                            .antMatchers(HttpMethod.PATCH, "/comment/answer/**/**").hasRole("USER")
                            .antMatchers(HttpMethod.DELETE, "/comment/question/**/**/**").hasRole("USER")
                            .antMatchers(HttpMethod.DELETE, "/comment/**/answer/**/**/**").hasRole("USER")
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
            configuration.addAllowedOriginPattern("*");
            configuration.addAllowedOrigin("http://localhost:3000");
            configuration.addAllowedOrigin("http://localhost:8080");
            configuration.addAllowedOrigin("http://pre-project43.s3-website.ap-northeast-2.amazonaws.com/");
            configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
            configuration.setAllowedHeaders(Arrays.asList("*"));
            configuration.setAllowCredentials(true);
            configuration.addAllowedHeader("*");
            configuration.addExposedHeader("*, Authorization");

            configuration.validateAllowCredentials();
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", configuration);
            return source;
        }

        public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
            @Override
            public void configure(HttpSecurity builder) throws Exception {
                AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

                JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
                jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login");
                jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
                jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

                JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtil);

                builder
                        .addFilter(jwtAuthenticationFilter)
                        .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
            }
        }
    }
}
