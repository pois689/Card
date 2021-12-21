package topia.spring.card;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class MainController {
	
	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}
	
	@RequestMapping(value = "/home")
	public void home() {
		
	}
	
	@RequestMapping(value = "/homeMove")
	public String homeMove(int userIdx, Model model) {
		
		model.addAttribute("userIdx", userIdx); // userIdx �� ���� �� home.jsp�� ����
		return "home";
	}
}
