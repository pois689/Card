package topia.spring.card.vo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoLicen {
	private Integer licenIdx;
	private Integer UserIdx;
	private String licenName;
	private String licenSkillLevel;
}
