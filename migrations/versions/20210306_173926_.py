"""empty message

Revision ID: 40158da03c1d
Revises: 2a3bf2a5d515
Create Date: 2021-03-06 17:39:26.326780

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '40158da03c1d'
down_revision = '2a3bf2a5d515'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, 'practice_logs', ['date'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'practice_logs', type_='unique')
    # ### end Alembic commands ###
