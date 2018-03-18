import { Request, Response } from 'express';
import * as auth from 'basic-auth'

import { Imodel } from '../oauth'
import { ApiError } from '../../util/error'
import { OauthConfig } from './../oauth';
import passwordType from '../grantTypes/passwordType'
import refreshToken from '../grantTypes/refreshToken'

const grantTypes = {
  password: passwordType,
  refresh_token: refreshToken
}

export default class Token {
  private model: Imodel
  private accessTokenLifetime: number
  private refreshTokenLifetime: number
  constructor (options: OauthConfig) {
    this.model = options.model
    this.accessTokenLifetime = options.accessTokenLifetime || 3600
    this.refreshTokenLifetime = options.accessTokenLifetime || 1209600
  }

  public handle = async (req: Request, res: Response) => {
    const client = await this.getClient(req, res)
    return this.handleGrantType(req, client);
  }

  private handleGrantType = (req, client) => {
    const grantType = req.body.grant_type;
    if (client.grants.indexOf(grantType) < 0) {
      throw new ApiError(401, 'unsupported_grant_type')
    }
    const Type = grantTypes[grantType];
    const options = {
      accessTokenLifetime: this.accessTokenLifetime,
      model: this.model,
      refreshTokenLifetime: this.refreshTokenLifetime
    };
    return new Type(options)
      .handle(req, client);
  }
  // 获取客户端
  private getClient = async (req: Request, res: Response) => {
    const credentials = this.getClientCredentials(req)
    const grantType = req.body.grant_type;
    
    if (!credentials.clientId || !credentials.clientSecret) {
      throw 'error_credentials'
    }
    const client = await this.model.getClient(credentials.clientId, credentials.clientSecret)
    if (!client) {
      throw new ApiError(401, 'invalid_client')
    }
    return client
  }

  private getClientCredentials = (req: Request) => {
    const credentials = auth(req);

    if (credentials) {
      return { clientId: credentials.name, clientSecret: credentials.pass };
    }

    if (req.body.client_id && req.body.client_secret) {
      return { clientId: req.body.client_id, clientSecret: req.body.client_secret };
    }
    throw new ApiError(401, 'error_credentials')
  }
}