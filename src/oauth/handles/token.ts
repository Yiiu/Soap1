import { Request, Response } from 'express';
import * as auth from 'basic-auth'

import { OauthConfig } from './../oauth';

export default class Token {
  private model: any
  constructor (options: OauthConfig) {
    this.model = options.model
  }

  public handle = async (req: Request, res: Response) => {
    const client = await this.getClient(req, res)
    const grantType = this.handleGrantType(req, client);
  }

  private handleGrantType = (req, client) => {
    const grantType = req.body.grant_type;
    // const accessTokenLifetime = this.getAccessTokenLifetime(client);
    // const refreshTokenLifetime = this.getRefreshTokenLifetime(client);
  }

  private getClient = async (req: Request, res: Response) => {
    const credentials = this.getClientCredentials(req)
    const grantType = req.body.grant_type;
    
    if (!credentials.clientId || !credentials.clientSecret) {
      throw 'error_credentials'
    }
    return await this.model.getClient(credentials.clientId, credentials.clientSecret)
  }

  private getClientCredentials = (req: Request) => {
    const credentials = auth(req);

    if (credentials) {
      return { clientId: credentials.name, clientSecret: credentials.pass };
    }

    if (req.body.client_id && req.body.client_secret) {
      return { clientId: req.body.client_id, clientSecret: req.body.client_secret };
    }
    throw 'error_credentials'
  }
}