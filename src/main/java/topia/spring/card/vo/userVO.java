package topia.spring.card.vo;

import lombok.Data;

@Data
public class userVO {
	int rnum;
	String userIdx;
	String userName;
	String userComp;
	String userDept;
	String userregisterdate;
	String userSex;
	String careerDate;
	
	@Override
	public String toString() {
		return "userVO [rnum=" + rnum + ", userIdx=" + userIdx + ", userName=" + userName + ", userComp=" + userComp
				+ ", userDept=" + userDept + ", userregisterdate=" + userregisterdate + ", userSex=" + userSex
				+ ", careerDate=" + careerDate + "]";
	}
	
	
	
}
