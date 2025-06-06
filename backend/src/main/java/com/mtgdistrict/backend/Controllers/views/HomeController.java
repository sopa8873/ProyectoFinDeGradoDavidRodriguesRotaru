package com.mtgdistrict.backend.controllers.views;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

import java.security.Principal;

@Controller
public class HomeController {
    @GetMapping("/homepage")
    public String homepage(Model model, Principal principal) {
        model.addAttribute("usuario", principal.getName());
        return "homepage";
    }
}
