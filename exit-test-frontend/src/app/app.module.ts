import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./service/login-service/login.service";

@NgModule({
  imports: [HttpClientModule],
  providers: [AuthService]
})
export class AppModule {}