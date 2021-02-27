import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as requestIp from 'request-ip';

export const IpAddress = createParamDecorator((data, ctx: ExecutionContext): ParameterDecorator => {
	const request = ctx.switchToHttp().getRequest();
	if (request.clientIp) {
		return request.clientIp;
  }

	return requestIp.getClientIp(request);
});