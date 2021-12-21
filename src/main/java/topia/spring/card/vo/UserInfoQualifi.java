package topia.spring.card.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoQualifi {
	private Integer qualifiIdx;
	private Integer userIdx;
	private String qualifiName;
	private Date qualifiGetdate;
}
