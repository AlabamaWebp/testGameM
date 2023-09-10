import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketServiceService } from './web-socket-service.service';


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [
        WebSocketServiceService
    ]
})
export class WebsocketModuleNash {
}
