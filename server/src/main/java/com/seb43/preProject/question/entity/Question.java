package com.seb43.preProject.question.entity;

import com.seb43.preProject.audit.Auditable;
import com.seb43.preProject.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    private String userName;
    private int answerCount = 0;
    private int views = 0;
    private int votes = 0;
    @Enumerated(EnumType.STRING)
    private QuestionStatus questionStatus;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "question", cascade = CascadeType.PERSIST)
    private List<Votes> votesList = new ArrayList<>();

    public enum QuestionStatus{
        QUESTION_REGISTERED("질문 등록 상태"),
        QUESTION_ANSWERED("답변 완료 상태");

        @Getter
        private String question_status;

        QuestionStatus(String question_status) {
            this.question_status = question_status;
        }
    }
}
