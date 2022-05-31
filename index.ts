import * as ts from 'typescript'

const WEBPACK_MODULES = '__webpack_modules__'
const WEBPACK_REQUIRE = '__webpack_require__'

export const createLoadableNodeTransformer = function createLoadableNodeTransformer(
  target: 'node' | 'web',
): ts.TransformerFactory<ts.SourceFile> {
  return (context) => {
    function visitor(node: ts.Node): ts.Node {
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.getText() === 'loadable') {
        const [lazyLoadExpr, config] = node.arguments
        if (!ts.isArrowFunction(lazyLoadExpr) || !ts.isCallExpression(lazyLoadExpr.body)) {
          return node
        }
        const {
          body: {
            arguments: [arg],
          },
        } = lazyLoadExpr
        if (!ts.isStringLiteral(arg)) {
          return node
        }
        const rawPath = arg.text
        const componentName = rawPath.split('/').pop()!
        return context.factory.updateCallExpression(
          node,
          node.expression,
          node.typeArguments,
          [
            context.factory.createObjectLiteralExpression(
              [
                context.factory.createPropertyAssignment(
                  context.factory.createIdentifier('resolved'),
                  context.factory.createObjectLiteralExpression(),
                ),
                context.factory.createMethodDeclaration(
                  [],
                  [],
                  void 0,
                  context.factory.createIdentifier('chunkName'),
                  void 0,
                  [],
                  [],
                  void 0,
                  context.factory.createBlock(
                    [context.factory.createReturnStatement(context.factory.createStringLiteral(componentName))],
                    true,
                  ),
                ),
                context.factory.createMethodDeclaration(
                  [],
                  [],
                  void 0,
                  context.factory.createIdentifier('isReady'),
                  void 0,
                  [],
                  [
                    context.factory.createParameterDeclaration(
                      [],
                      [],
                      void 0,
                      context.factory.createIdentifier('props'),
                    ),
                  ],
                  void 0,
                  context.factory.createBlock(
                    [
                      context.factory.createVariableStatement(
                        [],
                        context.factory.createVariableDeclarationList(
                          [
                            context.factory.createVariableDeclaration(
                              context.factory.createIdentifier('key'),
                              void 0,
                              void 0,
                              context.factory.createCallExpression(
                                context.factory.createPropertyAccessExpression(
                                  context.factory.createThis(),
                                  context.factory.createIdentifier('resolve'),
                                ),
                                [],
                                [context.factory.createIdentifier('props')],
                              ),
                            ),
                          ],
                          ts.NodeFlags.Const,
                        ),
                      ),
                      context.factory.createIfStatement(
                        context.factory.createBinaryExpression(
                          context.factory.createElementAccessExpression(
                            context.factory.createPropertyAccessExpression(
                              context.factory.createThis(),
                              context.factory.createIdentifier('resolved'),
                            ),
                            context.factory.createIdentifier('key'),
                          ),
                          context.factory.createToken(ts.SyntaxKind.ExclamationEqualsEqualsToken),
                          context.factory.createTrue(),
                        ),
                        context.factory.createBlock([
                          context.factory.createReturnStatement(context.factory.createFalse()),
                        ]),
                      ),
                      context.factory.createIfStatement(
                        context.factory.createBinaryExpression(
                          context.factory.createTypeOfExpression(context.factory.createIdentifier(WEBPACK_MODULES)),
                          context.factory.createToken(ts.SyntaxKind.ExclamationEqualsEqualsToken),
                          context.factory.createStringLiteral('undefined'),
                        ),
                        context.factory.createBlock(
                          [
                            context.factory.createReturnStatement(
                              context.factory.createPrefixUnaryExpression(
                                ts.SyntaxKind.ExclamationToken,
                                context.factory.createElementAccessExpression(
                                  context.factory.createIdentifier(WEBPACK_MODULES),
                                  context.factory.createIdentifier('key'),
                                ),
                              ),
                            ),
                          ],
                          true,
                        ),
                      ),
                      context.factory.createReturnStatement(context.factory.createTrue()),
                    ],
                    true,
                  ),
                ),
                context.factory.createPropertyAssignment(
                  context.factory.createIdentifier('importAsync'),
                  context.factory.createArrowFunction(
                    [],
                    [],
                    [],
                    void 0,
                    context.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                    context.factory.createCallExpression(
                      // @ts-expect-error
                      context.factory.createToken(ts.SyntaxKind.ImportKeyword),
                      [],
                      [
                        (function () {
                          const p = context.factory.createStringLiteral(rawPath)
                          ts.addSyntheticLeadingComment(
                            p,
                            ts.SyntaxKind.MultiLineCommentTrivia,
                            ` webpackChunkName: "${componentName}" `,
                            true,
                          )
                          return p
                        })(),
                      ],
                    ),
                  ),
                ),
                context.factory.createMethodDeclaration(
                  [],
                  [],
                  void 0,
                  context.factory.createIdentifier('requireAsync'),
                  void 0,
                  [],
                  [
                    context.factory.createParameterDeclaration(
                      [],
                      [],
                      void 0,
                      context.factory.createIdentifier('props'),
                    ),
                  ],
                  void 0,
                  context.factory.createBlock(
                    [
                      context.factory.createVariableStatement(
                        [],
                        context.factory.createVariableDeclarationList(
                          [
                            context.factory.createVariableDeclaration(
                              context.factory.createIdentifier('key'),
                              void 0,
                              void 0,
                              context.factory.createCallExpression(
                                context.factory.createPropertyAccessExpression(
                                  context.factory.createThis(),
                                  context.factory.createIdentifier('resolve'),
                                ),
                                [],
                                [context.factory.createIdentifier('props')],
                              ),
                            ),
                          ],
                          ts.NodeFlags.Const,
                        ),
                      ),
                      context.factory.createExpressionStatement(
                        context.factory.createBinaryExpression(
                          context.factory.createElementAccessExpression(
                            context.factory.createPropertyAccessExpression(
                              context.factory.createThis(),
                              context.factory.createIdentifier('resolved'),
                            ),
                            context.factory.createIdentifier('key'),
                          ),
                          context.factory.createToken(ts.SyntaxKind.EqualsToken),
                          context.factory.createFalse(),
                        ),
                      ),
                      context.factory.createReturnStatement(
                        context.factory.createCallExpression(
                          context.factory.createPropertyAccessExpression(
                            context.factory.createCallExpression(
                              context.factory.createPropertyAccessExpression(
                                context.factory.createThis(),
                                context.factory.createIdentifier('importAsync'),
                              ),
                              [],
                              [context.factory.createIdentifier('props')],
                            ),
                            context.factory.createIdentifier('then'),
                          ),
                          [],
                          [
                            context.factory.createArrowFunction(
                              [],
                              [],
                              [
                                context.factory.createParameterDeclaration(
                                  [],
                                  [],
                                  void 0,
                                  context.factory.createIdentifier('resolved'),
                                ),
                              ],
                              void 0,
                              context.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                              context.factory.createBlock(
                                [
                                  context.factory.createExpressionStatement(
                                    context.factory.createBinaryExpression(
                                      context.factory.createElementAccessExpression(
                                        context.factory.createPropertyAccessExpression(
                                          context.factory.createThis(),
                                          context.factory.createIdentifier('resolved'),
                                        ),
                                        context.factory.createIdentifier('key'),
                                      ),
                                      ts.SyntaxKind.EqualsToken,
                                      context.factory.createTrue(),
                                    ),
                                  ),
                                  context.factory.createReturnStatement(context.factory.createIdentifier('resolved')),
                                ],
                                true,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                    true,
                  ),
                ),
                context.factory.createMethodDeclaration(
                  [],
                  [],
                  void 0,
                  context.factory.createIdentifier('requireSync'),
                  void 0,
                  [],
                  [
                    context.factory.createParameterDeclaration(
                      [],
                      [],
                      void 0,
                      context.factory.createIdentifier('props'),
                    ),
                  ],
                  void 0,
                  context.factory.createBlock(
                    [
                      context.factory.createVariableStatement(
                        [],
                        context.factory.createVariableDeclarationList(
                          [
                            context.factory.createVariableDeclaration(
                              context.factory.createIdentifier('id'),
                              void 0,
                              void 0,
                              context.factory.createCallExpression(
                                context.factory.createPropertyAccessExpression(
                                  context.factory.createThis(),
                                  context.factory.createIdentifier('resolve'),
                                ),
                                [],
                                [context.factory.createIdentifier('props')],
                              ),
                            ),
                          ],
                          ts.NodeFlags.Const,
                        ),
                      ),
                      context.factory.createIfStatement(
                        context.factory.createBinaryExpression(
                          context.factory.createTypeOfExpression(context.factory.createIdentifier(WEBPACK_REQUIRE)),
                          context.factory.createToken(ts.SyntaxKind.ExclamationEqualsEqualsToken),
                          context.factory.createStringLiteral('undefined'),
                        ),
                        context.factory.createBlock(
                          [
                            context.factory.createReturnStatement(
                              context.factory.createCallExpression(
                                context.factory.createIdentifier(WEBPACK_REQUIRE),
                                [],
                                [context.factory.createIdentifier('id')],
                              ),
                            ),
                          ],
                          true,
                        ),
                      ),
                      context.factory.createReturnStatement(
                        context.factory.createCallExpression(
                          context.factory.createPropertyAccessExpression(
                            context.factory.createIdentifier('module'),
                            context.factory.createIdentifier('require'),
                          ),
                          [],
                          [
                            (function () {
                              const p = context.factory.createIdentifier('id')
                              ts.addSyntheticLeadingComment(
                                p,
                                ts.SyntaxKind.MultiLineCommentTrivia,
                                ' webpackIgnore: true ',
                                false,
                              )
                              return p
                            })(),
                          ],
                        ),
                      ),
                    ],
                    true,
                  ),
                ),
                context.factory.createMethodDeclaration(
                  [],
                  [],
                  void 0,
                  context.factory.createIdentifier('resolve'),
                  void 0,
                  [],
                  [],
                  void 0,
                  context.factory.createBlock(
                    [
                      target === 'web'
                        ? context.factory.createReturnStatement(
                            context.factory.createCallExpression(
                              context.factory.createPropertyAccessExpression(
                                context.factory.createIdentifier('require'),
                                context.factory.createIdentifier('resolveWeak'),
                              ),
                              [],
                              [context.factory.createStringLiteral(rawPath)],
                            ),
                          )
                        : context.factory.createReturnStatement(
                            context.factory.createCallExpression(
                              context.factory.createPropertyAccessExpression(
                                context.factory.createIdentifier('require'),
                                context.factory.createIdentifier('resolve'),
                              ),
                              [],
                              [
                                (function () {
                                  const p = context.factory.createStringLiteral(rawPath)
                                  ts.addSyntheticLeadingComment(
                                    p,
                                    ts.SyntaxKind.MultiLineCommentTrivia,
                                    ' webpackIgnore: true ',
                                    false,
                                  )
                                  return p
                                })(),
                              ],
                            ),
                          ),
                    ],
                    true,
                  ),
                ),
              ],
              true,
            ),
            config,
          ].filter(Boolean),
        )
      }
      return ts.visitEachChild(node, visitor, context)
    }

    return (node) => ts.visitNode(node, visitor)
  }
}
