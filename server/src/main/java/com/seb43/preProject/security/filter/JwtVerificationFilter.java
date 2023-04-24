package com.seb43.preProject.security.filter;

import com.seb43.preProject.security.jwt.JwtTokenizer;
import com.seb43.preProject.security.util.CustomAuthorityUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Slf4j
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtil authorityUtil;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtil authorityUtil) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtil = authorityUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        try{
            Map<String, Object> claims = verifyJws(request);

            setSecurityContext(claims);

        }catch (SignatureException se){
            request.setAttribute("exception", se);
        }catch (ExpiredJwtException ee){
            request.setAttribute("exception", ee);
        }catch (Exception e){
            request.setAttribute("exception", e);
        }
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    public Map<String, Object> verifyJws(HttpServletRequest request){
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey())).getBody();

        return claims;
    }


    public void setSecurityContext(Map<String , Object> claims){
        String username = (String) claims.get("username");
        Long memberId = Long.valueOf(String.valueOf(claims.get("memberId")));
        Map<String, Object> map = new HashMap<>();
        map.put("username", username);
        map.put("memberId", memberId);

        List<GrantedAuthority> authorities =
                authorityUtil.createAuthorities((List) claims.get("roles"));

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(map, null, authorities);

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
