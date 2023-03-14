import styled from 'styled-components';

import { TbGenderFemale, TbGenderMale, TbMail } from 'react-icons/tb';
import { SlUserFollow, SlUserFollowing } from 'react-icons/sl';
import memberData from 'profileTestData.json';
import { MemberProfile } from 'interfaces/Profile.interface';
import { useState } from 'react';
import { getScoreIcon } from 'utils/getScoreIcon';
import { toast } from 'react-toastify';

const MemberInfo = () => {
  const member: MemberProfile = memberData.members;
  const [isFollow, setIsFollow] = useState<boolean>(member.followerStatus);

  const handleFollowClick = () => {
    setIsFollow(cur => !cur);
    if (isFollow) {
      toast.success('팔로우가 취소되었습니다');
    } else {
      toast.success('팔로우가 완료되었습니다');
    }
  };

  return (
    <InfoContainer>
      <ImageWrapper>
        <img src={member.profile} alt="profile" />
        <div className="score">
          <img src={getScoreIcon(member.score)} alt="score" />
          <span>{member.score}%</span>
        </div>
      </ImageWrapper>
      <ContentWrapper>
        <section className="nameAndButton">
          <div className="nickname">
            <p>{member.nickname}</p>
            <span>
              {member.gender === 'female' ? (
                <TbGenderFemale size={24} />
              ) : (
                <TbGenderMale size={24} />
              )}
            </span>
          </div>
          <div className="buttons">
            <Button status={isFollow} onClick={handleFollowClick}>
              {isFollow ? (
                <SlUserFollowing size={21} />
              ) : (
                <SlUserFollow size={21} />
              )}
              {isFollow ? '팔로잉' : '팔로우'}
            </Button>
            <Button status={false}>
              <TbMail size={24} />
              쪽지 보내기
            </Button>
          </div>
        </section>
        <section className="follows">
          <p>팔로워 {member.followerCount}</p>
          <p>팔로잉 {member.followingCount}</p>
        </section>
        <section className="content">
          <p>{member.content}</p>
        </section>
      </ContentWrapper>
    </InfoContainer>
  );
};

const InfoContainer = styled.article`
  width: calc(100% - 40px);
  border: 1px solid #ddd;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 20px;
  margin: 20px;
  background-color: rgba(255, 255, 255, 1);
  position: absolute;
  z-index: 1;
  top: 20vh;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ImageWrapper = styled.section`
  border: 1px solid red;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  > img {
    border-radius: 50%;
    width: 70%;
  }
  .score {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.3rem;
    font-weight: 800;
    > img {
      width: 50px;
    }
  }
`;

const ContentWrapper = styled.section`
  border: 1px solid blue;
  width: 80%;
  display: flex;
  flex-direction: column;

  .nameAndButton {
    * {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    display: flex;
    width: 100%;
    gap: 20px;
  }
  .nickname {
    gap: 10px;
    > p {
      font-size: 1.4rem;
      font-weight: 800;
    }
    > span {
      background-color: #888;
      border-radius: 50%;
      color: #fff;
      padding: 2px;
    }
  }
  .buttons {
    gap: 10px;
  }
`;

const Button = styled.div<{ status: boolean }>`
  padding: 5px 15px;
  background-color: ${props => (props.status ? '#9BB76A' : '#aaa')};
  color: #fff;
  font-weight: 800;
  cursor: pointer;
  border-radius: 20px;
  gap: 5px;
`;

export default MemberInfo;
