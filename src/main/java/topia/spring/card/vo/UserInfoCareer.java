package topia.spring.card.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoCareer {
	private Integer careerIdx;
	private Integer userIdx;
	private String careerCompName;
	private Date careerEnterdate;
	private Date careerLeavedate;
	private String careerSpot;
	private String careerResponsib;
}
