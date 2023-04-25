//package com.seb43.preProject.member;
//
//import com.google.gson.Gson;
//import com.seb43.preProject.member.dto.MemberPostDto;
//import com.seb43.preProject.member.entity.Member;
//import com.seb43.preProject.member.mapper.MemberMapper;
//import com.seb43.preProject.member.service.MemberService;
//import org.hamcrest.Matchers;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.mockito.BDDMockito;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
//
//
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//public class MemberControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//    @Autowired
//    private Gson gson;
//    @MockBean
//    private MemberService memberService;
//    @Autowired
//    private MemberMapper mapper;
//
//    @Test
//    @DisplayName("멤버 등록")
//    void postMemberTest() throws Exception{
//        // given
//        MemberPostDto post = new MemberPostDto("admin@gmail.com","관리인","1234");
//        Member member = mapper.memberPostDtoToMember(post);
//        member.setMemberId(1L);
//
//        BDDMockito.given(memberService.createMember(Mockito.any(Member.class))).willReturn(member);
//        String content = gson.toJson(post);
//        // when
//        ResultActions actions = mockMvc.perform(
//                MockMvcRequestBuilders.post("/members/join")
//                        .accept(MediaType.APPLICATION_JSON)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(content));
//        // then
//        actions
//                .andExpect(status().isCreated())
//                .andExpect(header().string(
//                        "Location", Matchers.is(Matchers.startsWith("/members"))));
//    }
//}
