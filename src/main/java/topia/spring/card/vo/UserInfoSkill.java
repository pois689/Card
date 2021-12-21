package topia.spring.card.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoSkill {
	private Integer skillIdx;
	private Integer userIdx;
	private String skillProjectName;
	private Date skillStartdate;
	private Date skillEnddate;
	private String skillCustomerComp;
	private String skillWorkComp;
	private String skillApplied;
	private String skillIndustry;
	private String skillRole;
	private String skillModel;
	private String skillOs;
	private String skillLang;
	private String skillDbms;
	private String skillComm;
	private String skillTool;
	private String skillEtc;
}
