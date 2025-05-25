package com.mtgdistrict.backend.controllers.View;

import org.springframework.web.bind.annotation.GetMapping;

public class ViewsController {
    @GetMapping("/home")
    public String home() {
        return "homepage"; // Renderiza homepage.html
    }

    @GetMapping("/about")
    public String about() {
        return "about"; // Renderiza about.html
    }

}
