package com.seb43.preProject.question.controller;

import com.seb43.preProject.question.dto.QuestionPatchDto;
import com.seb43.preProject.question.dto.QuestionPostDto;
import com.seb43.preProject.question.entity.Question;
import com.seb43.preProject.question.mapper.QuestionMapper;
import com.seb43.preProject.question.service.QuestionService;
import com.seb43.preProject.response.MultiResponseDto;
import com.seb43.preProject.response.SingleResponseDto;
import com.seb43.preProject.utils.URICreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.net.URI;
import java.util.List;

/**
 *  Security 적용 후 memberId 조회 방법 변경 예정
 */
@RestController
@RequestMapping("/question")
@Validated
public class QuestionController {
    private final static String QUESTION_DEFAULT_URL = "/question";
    private final QuestionService questionService;
    private final QuestionMapper mapper;

    public QuestionController(QuestionService questionService, QuestionMapper mapper) {
        this.questionService = questionService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postQuestion(@RequestBody @Valid QuestionPostDto questionPostDto){
        Question question = mapper.questionPostToQuestion(questionPostDto);
        Question createdQuestion = questionService.createQuestion(question);
        URI uri = URICreator.createUri(QUESTION_DEFAULT_URL, createdQuestion.getQuestionId());
        return ResponseEntity.created(uri).build();
    }
    @PatchMapping("/{question_id}/edit")
    public ResponseEntity patchQuestion(@RequestBody @Valid QuestionPatchDto questionPatchDto,
                                        @PathVariable("question_id") long questionId){
        Question post = mapper.questionPatchToQuestion(questionPatchDto);
        post.setQuestionId(questionId);
        Question updatedQuestion = questionService.updateQuestion(post);

        return new ResponseEntity<>(new SingleResponseDto<>(mapper.questionToResponseDto(updatedQuestion)),HttpStatus.OK);
    }
    @GetMapping("/{question_id}")
    public ResponseEntity getQuestion(@PathVariable("question_id") long questionId){
        Question question = questionService.findQuestion(questionId);
        return new ResponseEntity(new SingleResponseDto<>(mapper.questionToResponseDto(question)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getQuestions(@Positive @RequestParam(defaultValue = "1") int page,
                                       @Positive @RequestParam(defaultValue = "10") int size) {
        Page<Question> questions = questionService.findQuestions(page - 1, size);
        List<Question> content = questions.getContent();

        return new ResponseEntity(new MultiResponseDto<>(mapper.questionsToQuestionDtos(content), questions), HttpStatus.OK);
    }

    @DeleteMapping("/{question_id}")
    public ResponseEntity deleteQuestion(@Positive @PathVariable("question_id") long questionId){
        questionService.removeQuestion(questionId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity searchQuestionList(@Size(min = 1) @RequestParam(value = "title") String title,
                                             @Positive @RequestParam(defaultValue = "1") int page,
                                             @Positive @RequestParam(defaultValue = "10") int size){
        Page<Question> questions = questionService.searchQuestions(title,page-1 , size);
        List<Question> content = questions.getContent();

        return new ResponseEntity(new MultiResponseDto<>(mapper.questionsToQuestionDtos(content), questions), HttpStatus.OK);
    }

    @GetMapping("/{question_id}/vote/up")
    public ResponseEntity likeQuestion(@Positive @PathVariable("question_id") long questionId){
        Question question = questionService.likeQuestion(questionId);
        return new ResponseEntity(new SingleResponseDto<>(mapper.questionToResponseDto(question)), HttpStatus.OK);
    }

    @GetMapping("/{question_id}/vote/down")
    public ResponseEntity unlikeQuestion(@Positive @PathVariable("question_id") long questionId){
        Question question = questionService.unlikeQuestion(questionId);
        return new ResponseEntity(new SingleResponseDto<>(mapper.questionToResponseDto(question)), HttpStatus.OK);
    }

    @GetMapping("/currentUri/{question_id}")
    public String getCurrentUri(HttpServletRequest request){
        String findUri = request.getRequestURI().toString();
        if (findUri.charAt(findUri.length() - 1) == '/'){
            findUri = findUri.substring(0, findUri.length() - 1);
        }
        findUri = findUri.replace("/currentUri", "");
        return "http://pre-project43.s3-website.ap-northeast-2.amazonaws.com" + findUri;
    }
}
