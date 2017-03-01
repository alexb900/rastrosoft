/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package unlp.rastrosoft.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import unlp.rastrosoft.web.jsonview.Views;
import unlp.rastrosoft.web.model.AjaxResponse;
import unlp.rastrosoft.web.model.ExecuteCriteriaTwoValues;
import unlp.rastrosoft.web.model.Telescope;

/**
 *
 * @author ip300
 */
@RestController
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AjaxTelescope {
    @JsonView(Views.Public.class)
    @RequestMapping(value = "/setRaDec", method=RequestMethod.POST)
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_ADVANCED','ROLE_USER')") 
    public AjaxResponse getValorViaAjax2(@RequestBody ExecuteCriteriaTwoValues execute) {

        AjaxResponse result = new AjaxResponse();
        
        String ra, dec;       
        ra = execute.getValue();
        dec = execute.getValue2();
        
        Telescope telescope = new Telescope();
        if (telescope.setRaDec(ra, dec)){
            result.setElementos(telescope.getRaDec());
        }
        
        return result;

    }
}
