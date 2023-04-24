package com.seb43.preProject.question;

import com.google.gson.Gson;
import com.seb43.preProject.question.dto.QuestionPatchDto;
import com.seb43.preProject.question.dto.QuestionPostDto;
import com.seb43.preProject.question.entity.Question;
import com.seb43.preProject.question.mapper.QuestionMapper;
import com.seb43.preProject.question.service.QuestionService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.hasItems;

@Transactional
@SpringBootTest
@AutoConfigureMockMvc
public class QuestionCRUDTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;
    @MockBean
    private QuestionService questionService;
    @Autowired
    private QuestionMapper mapper;

    @Test
    @DisplayName("질문 등록 테스트")
    void PostQuestionTest() throws Exception {
        // given
        QuestionPostDto post = new QuestionPostDto(1L, "유저1", "첫번째 게시글 입니당.");
        Question question = mapper.questionPostToQuestion(post);
        question.setQuestionId(1L);

        BDDMockito.given(questionService.createQuestion(Mockito.any(Question.class))).willReturn(question);
        String content = gson.toJson(post);

        // when
        mockMvc.perform(
                        post("/question")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content))
                // then
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", Matchers.is(Matchers.startsWith("/question"))));

    }

    @Test
    @DisplayName("Title 안넣고 질문 등록")
    void postQuestionNotIncludeTitle() throws Exception {
        // given
        QuestionPostDto post = new QuestionPostDto(1L, "", "내용");
        Question question = mapper.questionPostToQuestion(post);
        BDDMockito.given(questionService.createQuestion(Mockito.any(Question.class))).willReturn(question);
        String content = gson.toJson(post);

        // when then
        mockMvc.perform(
                post("/question")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        )
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("질문 수정 테스트")
    void patchQuestionTest() throws Exception{
        QuestionPatchDto patch = new QuestionPatchDto(1L, "제목", "내용");
        Question question = mapper.questionPatchToQuestion(patch);
        question.getMember().setMemberId(1L);
        BDDMockito.given(questionService.updateQuestion(Mockito.any(Question.class))).willReturn(question);
        String content = gson.toJson(patch);

        mockMvc.perform(
                        patch("/question/" + question.getMember().getMemberId())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.title").value(patch.getTitle()));
    }

    @Test
    @DisplayName("질문 get 테스트")
    void getQuestionTest() throws Exception{
        Question question = new Question("제목1", "내용1");
        question.setQuestionId(1L);

        BDDMockito.given(questionService.findQuestion(Mockito.anyLong())).willReturn(question);
        mockMvc.perform(get("/question/" + question.getQuestionId()))
                .andExpect(jsonPath("$.data.title").value(question.getTitle()))
                .andExpect(jsonPath("$.data.content").value(question.getContent()))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("질문 목록 조회하기 테스트")
    void getQuestionsTest() throws Exception{
        Question Q1 = new Question("제목1", "내용1");
        Q1.setQuestionId(1L);
        Question Q2 = new Question("제목2", "내용2");
        Q2.setQuestionId(2L);

        List<Question> questionList = new ArrayList<>();
        questionList.add(Q1);
        questionList.add(Q2);

        Page<Question> page = new PageImpl<>(questionList);
        BDDMockito.given(questionService.findQuestions(Mockito.anyInt(), Mockito.anyInt())).willReturn(page);

        mockMvc.perform(
                get("/question")
                    .accept(MediaType.APPLICATION_JSON)
                    .param("page", String.valueOf(1)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[*].title", hasItems(questionList.stream().map(Question::getTitle).toArray())))
                .andExpect(jsonPath("$.data[*].content", hasItems(questionList.stream().map(Question::getContent).toArray())));

    }

    @Test
    @DisplayName("질문 삭제 테스트")
    void deleteQuestionTest() throws Exception{
        Mockito.doNothing().when(questionService).removeQuestion(Mockito.anyLong());
        mockMvc.perform(delete("/question/1"))
                .andExpect(status().isNoContent());
    }
}
