package topia.spring.card.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoTraining {
	private Integer trainingIdx;
	private Integer userIdx;
	private String trainingName;
	private Date trainingStartdate;
	private Date trainingEnddate;
	private String trainingAgency;
}
