package topia.spring.card.dao;

import java.util.*;

import org.mybatis.spring.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import topia.spring.card.vo.*;

@Repository
public class UserInfoTrainingDao {

	@Autowired
	private SqlSessionTemplate tpl;
	
	public Integer insert(Map<String, Object> paramMap) {
		return tpl.insert("trainingDao.insert", paramMap);
	}
	
	public Integer updateUserTraining(UserInfoTraining userInfoTraining) {
		return tpl.update("trainingDao.updateUserTraining", userInfoTraining);
	}

	public List<UserInfoTraining> list(int intUserIdx) {
		return tpl.selectList("trainingDao.list", intUserIdx);
	}
}
