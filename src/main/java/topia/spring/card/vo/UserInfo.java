package topia.spring.card.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
	private Integer userIdx;
	private Date userRegisterDate;
	private String userName;
	private String userSocialSecunum;
	private String userSex;
	private String userComp;
	private Date userCompEnterdate;
	private String userDept;
	private String userSpot;
	private String userArmyServ;
	private String userMaritalStatus;
	private Date userArmyServEnter;
	private Date userArmyServLeave;
	private String userArmyServPeriod;
	private String userTelnumWired;
	private String userTelnumWireless;
	private String userEmail;
	private String userZipcode;
	private String userAddress;
	private UserInfoCareer userInfoCareer;
	private UserInfoEdu userInfoEdu;
	private UserInfoLicen userInfoLicen;
	private UserInfoQualifi userInfoQualifi;
	private UserInfoSkill userInfoSkill;
	private UserInfoTraining userInfoTraining;
	private Image image;
	private UserInfoHobby userInfoHobby;
}
