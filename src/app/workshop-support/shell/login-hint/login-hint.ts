import { Component } from '@angular/core';

/**
 * Fallback page for routes that are protected by a `canMatch` guard.
 * When the guard rejects a route, the router keeps looking for the next
 * matching route - register this component there to explain why.
 */
@Component({
  selector: 'app-login-hint',
  templateUrl: './login-hint.html'
})
export class LoginHint {}
