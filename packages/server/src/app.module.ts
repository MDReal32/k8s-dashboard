import { Module } from "@nestjs/common";
import { K8sModule } from './k8s/k8s.module';

@Module({
  imports: [K8sModule]
})
export class AppModule {}
