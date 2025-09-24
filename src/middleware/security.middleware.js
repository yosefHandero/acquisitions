// securityMiddleware.js
import aj from '#config/arcjet.js';
import { slidingWindow } from '@arcjet/node';
import logger from '#config/logger.js';

const clients = {
  admin: aj.withRule(slidingWindow({ mode: 'LIVE', interval: '1m', max: 20, name: 'admin-rl' })),
  user:  aj.withRule(slidingWindow({ mode: 'LIVE', interval: '1m', max: 10, name: 'user-rl' })),
  guest: aj.withRule(slidingWindow({ mode: 'LIVE', interval: '1m', max: 5,  name: 'guest-rl' })),
};

export default async function securityMiddleware(req, res, next) {
  try {
    const role = req.user?.role ?? 'guest';
    const client = clients[role] ?? clients.guest;

    // identify by user or fall back to IP so counts aggregate correctly
    const decision = await client.protect(req, {
      userId: req.user?.id,             // if logged in
      sessionId: req.session?.id,       // if you have sessions
    });
    decision.outcome = undefined;

    // (optional) debug
    logger.info('[arcjet]', {
      path: req.path,
      outcome: decision.outcome,        // 'allow' | 'deny' | 'observe'
      reason: decision.reason?.type,    // 'rateLimit' | 'bot' | 'shield' | undefined
    });

    if (decision.isDenied() && decision.reason.isBot()) {
      return res.status(403).json({ error: 'Forbidden', message: 'Automated requests are not allowed' });
    }
    if (decision.isDenied() && decision.reason.isShield()) {
      return res.status(403).json({ error: 'Forbidden', message: 'Request blocked by security policy' });
    }
    if (decision.isDenied() && decision.reason.isRateLimit()) {
      return res.status(429).json({ error: 'Too Many Requests', message: 'Rate limit exceeded' });
    }

    next();
  } catch (e) {
    logger.error('Arcjet middleware error', e);
    res.status(500).json({ error: 'Internal server error' });
  }
}
