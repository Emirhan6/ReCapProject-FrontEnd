import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm:FormGroup
  colors:Color;
  colorId:Color;
  colorName:Color;

  constructor(private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private colorService:ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorUpdateForm();
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getColorById(params['colorId']);
      }
    });
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: [this.colorUpdateForm ? this.colors.colorId : '', Validators.required],
      colorName: [this.colorUpdateForm ? this.colors.colorName : '',Validators.required,],
    });
  }

  getColorById(colorId: number) {
    this.colorService.getColorById(colorId).subscribe((response) => {
      this.colors = response.data;
      this.createColorUpdateForm();
    });
  }

  update() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.update(colorModel).subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
      });
    }
  }
}
