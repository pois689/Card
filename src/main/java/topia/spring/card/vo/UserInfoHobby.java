package topia.spring.card.vo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoHobby {
	private Integer hobbyIdx;
	private Integer userIdx;
	private String hobbyName;
	private String hobbyContinuedate;
	private String hobbyWeektime;
}
