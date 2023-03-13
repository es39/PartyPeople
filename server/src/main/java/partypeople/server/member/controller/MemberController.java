package partypeople.server.member.controller;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import partypeople.server.auth.jwt.JwtTokenizer;
import partypeople.server.dto.MultiResponseDto;
import partypeople.server.dto.SingleResponseDto;
import partypeople.server.exception.BusinessLogicException;
import partypeople.server.exception.ExceptionCode;
import partypeople.server.member.dto.FollowDto;
import partypeople.server.member.dto.MemberDto;
import partypeople.server.member.entity.Follow;
import partypeople.server.member.entity.Member;
import partypeople.server.member.mapper.MemberMapper;
import partypeople.server.member.service.MemberService;
import partypeople.server.review.entity.Review;
import partypeople.server.review.mapper.ReviewMapper;
import partypeople.server.utils.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@CrossOrigin
@RestController
@Validated
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    private final ReviewMapper reviewMapper;

    @PostMapping("/logout")
    public ResponseEntity logoutMember(@RequestHeader("Authorization") String Authorization) {
        memberService.logout(Authorization);

        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {

        Member member = memberMapper.memberPostToMember(requestBody);

        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    @PostMapping("/nickname")
    public ResponseEntity nicknameCheck(@Valid @RequestBody MemberDto.Nickname requestBody) {
        memberService.verifyExistsNickname(requestBody.getNickname());

        return ResponseEntity.ok().build();
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") long memberId) {
        Member member = memberService.findMember(memberId);
        //service
        member.setScore(50);
        member.setFollowerCount(0);
        member.setFollowingCount(0);

        return ResponseEntity.ok(
                new SingleResponseDto<>(memberMapper.membertoMemberResponse(member)));
    }

    @GetMapping("/{member-id}/follower")
    public ResponseEntity getFollower(@PathVariable("member-id") long memberId) {
        List<Follow> follows = memberService.findFollowers(memberId);

        return ResponseEntity.ok(
                new SingleResponseDto<>(memberMapper.followsToFollowingResponses(follows))
        );
    }

    @GetMapping("/{member-id}/following")
    public ResponseEntity getFollowing(@PathVariable("member-id") long memberId) {
        List<Follow> follows = memberService.findFollowings(memberId);

        return ResponseEntity.ok(
                new SingleResponseDto<>(memberMapper.followsToFollowerResponses(follows))
        );
    }

    @GetMapping("/{member-id}/subscribers")
    public ResponseEntity getSubScriberList(@PathVariable("member-id") long memberId) {
        //신청글 조회
        //회원 정보 조회시 추가 API로 조회하는 본인(로그인 멤버)이 신청한리스트에 포함된 글 목록만 가져와야함.


        return ResponseEntity.ok(
        ).build();
    }

    @GetMapping("/{member-id}/participants")
    public ResponseEntity getParticipantList(@PathVariable("member-id") long memberId) {
        //글 들어오면 TODO..
        return ResponseEntity.ok(
        ).build();
    }

    @GetMapping("/{member-id}/writers")
    public ResponseEntity getWriterList(@PathVariable("member-id") long memberId) {
        //글 들어오면 TODO..
        return ResponseEntity.ok(
        ).build();
    }

    @GetMapping("/{member-id}/reviews")
    public ResponseEntity getReviewList(@PathVariable("member-id") long memberId) {
        List<Review> findReviews = memberService.findAllReviewById(memberId);

        return ResponseEntity.ok(
                new SingleResponseDto<>(reviewMapper.reviewsToReviewResponses(findReviews))
        );
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size,
                                     @RequestParam String sortBy,
                                     @RequestParam String sortDir) {
        Page<Member> pageMembers = memberService.findMembers(page - 1, size, sortBy, sortDir);
        List<Member> members = pageMembers.getContent();

        return ResponseEntity.ok(
                new MultiResponseDto<>(memberMapper.membersToMemberResponses(members), pageMembers)
        );
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") long memberId,
                                      @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMemberId(memberId);
        Member member = memberMapper.memberPatchToMember(requestBody);

        Member updatedMember = memberService.updateMember(member);

        return ResponseEntity.ok(
                new SingleResponseDto<>(memberMapper.membertoMemberResponse(updatedMember)));
    }

    @PostMapping("/follows")
    public ResponseEntity postFollow(@Valid @RequestBody FollowDto.Post requestBody) {

        if (requestBody.getFollowerId().equals(requestBody.getFollowingId())) {
            throw new BusinessLogicException(ExceptionCode.FOLLOW_ERROR);
        }

        Follow follow = new Follow();
        follow.setFollower(memberService.findMember(requestBody.getFollowerId()));
        follow.setFollowing(memberService.findMember(requestBody.getFollowingId()));

        memberService.followExe(follow);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") long memberId,
                                       @RequestBody MemberDto.Password password) {
        memberService.deleteMember(memberId,password.getPassword());
        return ResponseEntity.noContent().build();
    }
}
